import levenshtein from "fast-levenshtein";

class RouteMatcher {
  constructor(validRoutes, threshold) {
    this.validRoutes = validRoutes;
    this.threshold = threshold;
  }

  findClosestRoute(requestedRoute) {
    let closestMatch = null;
    let minDistance = Infinity;

    this.validRoutes.forEach((route) => {
      const distance = levenshtein.get(route, requestedRoute);
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = route;
      }
    });

    return minDistance <= this.threshold ? closestMatch : null;
  }
}

export default RouteMatcher;
