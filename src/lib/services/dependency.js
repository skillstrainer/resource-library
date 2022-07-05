import React, { useEffect, useState } from "react";

export default function useDependencyService(config) {
  const providedDependencies = config.dependencies;
  const [dependencies, setDependencies] = useState(providedDependencies);

  useEffect(() => {
    if (providedDependencies && typeof providedDependencies === "object")
      setDependencies({ ...dependencies, ...providedDependencies });
  }, [config.dependencies]);

  const addDependency = (partial) =>
    setDependencies({ ...partial, ...dependencies });

  const services = {
    dependencies,
    addDependency,
  };

  return [services];
}
