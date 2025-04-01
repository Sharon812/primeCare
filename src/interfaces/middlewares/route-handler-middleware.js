import RouteMatcher from "../../utils/route-matcher.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RouteHandlerMiddleWare {
  constructor(validRoutes, threshold) {
    this.routeMatcher = new RouteMatcher(validRoutes, threshold);
  }

  handle = (req, res, next) => {
    const requestedRoute = req.originalUrl.toLowerCase();

    const closestRoute = this.routeMatcher.findClosestRoute(requestedRoute);

    // Special case: If the doctor enters "/doctor" or "/doctor/", redirect to "/doctor/login"
    if (requestedRoute === "/doctor" || requestedRoute === "/doctor/") {
      return res.redirect("/doctor/login");
    }

    if (closestRoute) {
      console.log(`Redirecting from ${requestedRoute} to ${closestRoute}`);
      return res.redirect(closestRoute);
    }

    res.status(404).render("404-page", { message: "Page Not Found" });
  };
}

export default RouteHandlerMiddleWare;
