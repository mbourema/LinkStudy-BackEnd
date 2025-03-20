/** Test pour ton API utilisant Jest et Supertest */
import request from "supertest"; //Fonction principale de Supertest. Permet de simuler des requêtes HTTP vers l'application Express.
import { app } from "../server";

/** Fonction de Jest qui permet de regrouper plusieurs tests sous un même intitulé. Le premier argument de describe est une chaîne de caractères qui décrit ce qu'on teste
Le deuxième argument est une fonction qui contient tous les tests.
 */
describe("Users API", () => {
  //test est une fonction de jest qui définit un test, le premier argument est une description de ce que le test vérifie et le deuxième une fonction qui contient la logique du test
  //La fonction est asynchrone, car la requête HTTP peut prendre du temps 
  test("GET /users - Récupérer tous les utilisateurs", async () => {
    const res = await request(app).get("/users");
    //expect est une fonction de Jest utilisée pour faire des assertions dans les tests, pour vérifier si la valeur retournée correspond à ce qu'on attends.
    expect(res.statusCode).toBe(200);
    //Vérifie que le corps de la réponse (res.body) est bien un tableau, ce qui est attendu si l'API renvoie une liste d'utilisateurs.
    expect(Array.isArray(res.body)).toBe(true);
  });
});
