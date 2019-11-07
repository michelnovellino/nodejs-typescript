import app from "./app";
import "./db/database";
function main() {
    app.listen(app.get("port"));
    console.log("server on port >>>", app.get("port"));
}
main()