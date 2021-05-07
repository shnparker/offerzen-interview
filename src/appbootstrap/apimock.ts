import { createServer, Response } from "miragejs";
import { Interview, SignInRequest, UserSignInResponse } from "../types/api";
import interviews from "./interviews.json";

// This is needed to update the interviews when archiving, instead of using the Node 'fs' library to update the file
const interviewsCloneForArchiveUpdate = JSON.parse(JSON.stringify(interviews));

createServer({
  routes() {
    this.namespace = "api";
    this.timing = 1000;

    this.post("/login", (_schema, request): UserSignInResponse | Response => {
      const attrs: SignInRequest = JSON.parse(request.requestBody);

      // No database, there is only one user here!
      if (attrs.email !== "demo@offerzen.com" || attrs.password !== "P@ssw0rd1!") {
        const data = { error: ["Incorrect email or password"] };
        const headers = {};

        return new Response(422, headers, data);
      }

      // Return semi-nonsense for the frontend auth expecting this format
      return {
        id: "1234567890",
        type: "COMPANY",
        token: "SuperSecretFakeJWT",
        email: "demo@offerzen.com",
      };
    });

    this.post(
      "/interviews/archive",
      (_schema, request): Response => {
        const attrs = JSON.parse(request.requestBody);
        const headers = {};

        const interviewIndex = interviewsCloneForArchiveUpdate.findIndex(
          (i: Interview) => i.candidate === attrs.candidate
        );
        const currentValue = interviewsCloneForArchiveUpdate[interviewIndex].archived;
        interviewsCloneForArchiveUpdate[interviewIndex].archived = !currentValue;

        console.log(interviewsCloneForArchiveUpdate[interviewIndex]);

        return new Response(200, headers, interviewsCloneForArchiveUpdate[interviewIndex]);
      }
    );

    this.get("/interviews", (_schema, request): Interview[] => {
      if (request.queryParams["archived"] === "true") {
        return interviewsCloneForArchiveUpdate;
      }
      return interviewsCloneForArchiveUpdate.filter((interview: Interview) => !interview.archived);
    });
  },
});
