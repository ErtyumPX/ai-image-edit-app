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
    beforeImage: "disney_before.png",
    afterImage: "disney_after.png",
    cfg_scale: 35
}

const pixarPrompt: PromptData = {
    title: "Pixar",
    prompt: "A Pixar movie scene",
    strength: 0.6,
    style_preset: null,
    beforeImage: "pixar_before.png",
    afterImage: "pixar_after.png",
    cfg_scale: 35
}

const toyStoryPrompt: PromptData = {
    title: "Toy Story",
    prompt: "A Toy Story scene",
    strength: 0.4,
    style_preset: 'digital-art',
    beforeImage: "toystory_before.png",
    afterImage: "toystory_after.png",
    cfg_scale: 35
}

const lotrPrompt: PromptData = {
    title: "Lord of the Rings",
    prompt: "A scene from the Lord of the Rings",
    strength: 0.45,
    style_preset: null,
    beforeImage: "lotr_before.png",
    afterImage: "lotr_after.png",
    cfg_scale: 35
}

const starWarsPrompt: PromptData = {
    title: "Star Wars",
    prompt: "A star wars scene",
    strength: 0.4,
    style_preset: null,
    beforeImage: "starWars_before.png",
    afterImage: "starWars_after.png",
    cfg_scale: 35
}

const vanGoghPrompt: PromptData = {
    title: "Van Gogh",
    prompt: "A painting from Van Gogh",
    strength: 0.6,
    style_preset: null,
    beforeImage: "vanGogh_before.png",
    afterImage: "vanGogh_after.png",
    cfg_scale: 35
}

const minecraftPrompt: PromptData = {
    title: "Minecraft",
    prompt: "A screenshot from Minecraft",
    strength: 0.425,
    style_preset: null,
    beforeImage: "minecraft_before.png",
    afterImage: "minecraft_after.png",
    cfg_scale: 35
}

const legoPrompt: PromptData = {
    title: "Lego",
    prompt: "A lego minifigure standing in a room made of lego filled with other minifigures",
    strength: 0.4,
    style_preset: null,
    beforeImage: "lego_before.png",
    afterImage: "lego_after.png",
    cfg_scale: 35
}


export const allPrompts = [
    disneyPrompt,
    pixarPrompt,
    toyStoryPrompt,
    lotrPrompt,
    starWarsPrompt,
    vanGoghPrompt,
    minecraftPrompt,
    legoPrompt
]
