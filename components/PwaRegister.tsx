"use client";
import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker successfully registered with scope: ", registration.scope);
          },
          function (error) {
            console.log("Service Worker registration failed: ", error);
          }
        );
      });
    }
  }, []);

  return null;
}
