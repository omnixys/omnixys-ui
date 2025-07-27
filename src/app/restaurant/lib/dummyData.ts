export const restaurants = [
    {
        id: "1",
        name: "Italiano Express",
        cuisine: "Italienisch",
        image: "/images/italian.jpg",
        dishes: [
            {
                id: "d1",
                name: "Spaghetti Carbonara",
                priceCook: 12.99, // Kochbox
                priceReady: 14.99, // Fertiggericht
                type: ["cook", "ready"], // beide Optionen
                ingredients: ["Spaghetti", "Speck", "Ei", "Parmesan"],
                instructions:
                    "Koche die Spaghetti, brate den Speck, mische mit Ei und Käse.",
            },
            {
                id: "d2",
                name: "Penne Arrabbiata",
                priceCook: 10.5,
                priceReady: 12.0,
                type: ["cook", "ready"],
                ingredients: ["Penne", "Tomaten", "Knoblauch", "Chili"],
                instructions: "Koche die Penne und bereite die Sauce mit Chili zu.",
            },
        ],
    },
];
