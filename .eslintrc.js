module.exports = {
    plugins: ["filenames"],
    rules: {
      // React-Komponenten: PascalCase (z. B. CustomerForm.tsx)
      "filenames/match-regex": [
        "error",
        "^(?:[A-Z][a-z0-9]+)+\\.tsx?$", // PascalCase für .tsx
        {
          "ignoreMiddleExtensions": true,
          "message": "React-Komponenten müssen in PascalCase benannt sein (z.B. CustomerForm.tsx)",
        },
      ],
  
      // Helper/Utils/Hooks: camelCase (z. B. formatDate.ts)
      "filenames/match-regex": [
        "error",
        "^[a-z][a-zA-Z0-9]*\\.ts$",
        {
          "ignoreMiddleExtensions": true,
          "message": "Hilfsfunktionen, Hooks und Services müssen in camelCase benannt sein (z.B. formatDate.ts)",
        },
      ],
  
      // GraphQL Queries/Mutations: UPPER_SNAKE (z. B. GET_USER_BY_ID.ts)
      "filenames/match-regex": [
        "error",
        "^[A-Z0-9_]+\\.ts$",
        {
          "ignoreMiddleExtensions": true,
          "message": "GraphQL-Dateien sollten in UPPER_SNAKE_CASE geschrieben sein (z.B. GET_USER_BY_ID.ts)",
        },
      ],
    },
    overrides: [
      {
        files: ["**/*.type.ts", "**/*.dto.ts"],
        rules: {
          "filenames/match-regex": [
            "error",
            "^[a-z0-9\\-]+\\.(type|dto)\\.ts$",
            {
              "message": "Typ- und DTO-Dateien müssen in kebab-case geschrieben sein (z.B. person-form.dto.ts)",
            },
          ],
        },
      },
      {
        files: ["**/page.tsx", "**/layout.tsx"],
        rules: {
          "filenames/match-regex": "off", // Next.js-Seiten haben fixe Namen
        },
      },
    ],
  };
  