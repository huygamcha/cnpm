import slugify from "slugify";

const category = [
    {
        name: "Coat",
        slug: "coat",
    },
    {
        name: "Dresses",
        slug: slugify("Dresses"),
    },
    {
        name: "Sweater",
        slug: slugify("Sweater"),
    },
    {
        name: "Hat",
        slug: slugify("Hat"),
    },
    {
        name: "Sneakers",
        slug: slugify("Sneakers"),
    },
    {
        name: "Jeans",
        slug: "jeans",
    },
    {
        name: "Shirt",
        slug: "shirt",
    },
    {
        name: "Jackets",
        slug: "jackets",
    },
    {
        name: "Skirts",
        slug: "skirts",
    },
];

export default category;
