export interface PromptData {
    title: string,
    prompt: string,
    strength: number, // 0-1 float
    style_preset: string | null,
    beforeImage: string,
    afterImage: string
    cfg_scale: number // 0-35 int
}

/* -- Style Presets --
enhance
anime
photographic
digital-art
comic-book
fantasy-art
line-art
analog-film
neon-punk
isometric
low-poly
origami
modeling-compound
cinematic
3d-model
pixel-art
tile-texture
*/

const disneyPrompt: PromptData = {
    title: "Disney",
    prompt: "A person in a Disney universe as a Disney character",
    strength: 0.5,
    style_preset: 'digital-art',
    beforeImage: "/disney_before.png",
    afterImage: "/disney_after.png",
    cfg_scale: 35
}

const pixarPrompt: PromptData = {
    title: "Pixar",
    prompt: "A Pixar movie scene",
    strength: 0.6,
    style_preset: null,
    beforeImage: "/pixar_before.png",
    afterImage: "/pixar_after.png",
    cfg_scale: 35
}

const toyStoryPrompt: PromptData = {
    title: "Toy Story",
    prompt: "A Toy Story scene",
    strength: 0.5,
    style_preset: 'digital-art',
    beforeImage: "/toystory_before.png",
    afterImage: "/toystory_after.png",
    cfg_scale: 35
}

const lotrPrompt: PromptData = {
    title: "Lord of the Rings",
    prompt: "A scene from the Lord of the Rings",
    strength: 0.5,
    style_preset: null,
    beforeImage: "/lotr_before.png",
    afterImage: "/lotr_after.png",
    cfg_scale: 35
}

const starWarsPrompt: PromptData = {
    title: "Star Wars",
    prompt: "A star wars scene",
    strength: 0.5,
    style_preset: null,
    beforeImage: "/starWars_before.png",
    afterImage: "/starWars_after.png",
    cfg_scale: 35
}

const vanGoghPrompt: PromptData = {
    title: "Van Gogh",
    prompt: "A painting from Van Gogh",
    strength: 0.6,
    style_preset: null,
    beforeImage: "/vanGogh_before.png",
    afterImage: "/vanGogh_after.png",
    cfg_scale: 35
}

const animePrompt: PromptData = {
    title: "Anime",
    prompt: "An anime scene",
    strength: 0.5,
    style_preset: "anime",
    beforeImage: "/anime_before.png",
    afterImage: "/anime_after.png",
    cfg_scale: 35
}

const comicBookPrompt: PromptData = {
    title: "Comic Book Style",
    prompt: "A page from a comic book",
    strength: 0.5,
    style_preset: "comic-book",
    beforeImage: "/comicBook_before.png",
    afterImage: "/comicBook_after.png",
    cfg_scale: 35
}

const ninetiesPrompt: PromptData = {
    title: "90's",
    prompt: "A photograph taken from 90's",
    strength: 0.6,
    style_preset: "analog-film",
    beforeImage: "/nineties_before.png",
    afterImage: "/nineties_after.png",
    cfg_scale: 35
}

const yearbookPrompt: PromptData = {
    title: "Highschool Yearbook",
    prompt: "A photograph from a highschool yearbook",
    strength: 0.4,
    style_preset: null,
    beforeImage: "/yearbook_before.png",
    afterImage: "/yearbook_after.png",
    cfg_scale: 35
}

const videoGamePrompt: PromptData = {
    title: "Video Game",
    prompt: "A screenshot from a video game",
    strength: 0.45,
    style_preset: "digital-art",
    beforeImage: "/videoGame_before.png",
    afterImage: "/videoGame_after.png",
    cfg_scale: 35
}

const sketchPrompt: PromptData = {
    title: "Sketch",
    prompt: "A sketch drawing",
    strength: 0.435,
    style_preset: "line-art",
    beforeImage: "/sketch_before.png",
    afterImage: "/sketch_after.png",
    cfg_scale: 35
}

export const allPrompts = [
    disneyPrompt,
    pixarPrompt,
    toyStoryPrompt,
    lotrPrompt,
    starWarsPrompt,
    vanGoghPrompt,
    animePrompt,
    comicBookPrompt,
    ninetiesPrompt,
    yearbookPrompt,
    videoGamePrompt,
    sketchPrompt
]
