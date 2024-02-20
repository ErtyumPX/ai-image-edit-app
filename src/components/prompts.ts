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
    prompt: "A person in a disney universe as a disney character",
    strength: 0.5,
    style_preset: 'digital-art',
    beforeImage: "disney_before.png",
    afterImage: "disney_after.png",
    cfg_scale: 35
}

const pixarPrompt: PromptData = {
    title: "Pixar",
    prompt: "A pixar animation of man with a hat standing next to a blue car, with a blue sky and clouds",
    strength: 0.5,
    style_preset: null,
    beforeImage: "pixar_before.png",
    afterImage: "pixar_after.png",
    cfg_scale: 35
}

const toyStoryPrompt: PromptData = {
    title: "Toy Story",
    prompt: "A person in a toy story universe as a toy",
    strength: 0.5,
    style_preset: 'digital-art',
    beforeImage: "toystory_before.png",
    afterImage: "toystory_after.png",,
    cfg_scale: 35
}

const legoPrompt: PromptData = {
    title: "Lego",
    prompt: "a lego man with a hat standing next to a blue car, with a blue sky and clouds",
    strength: 0.5,
    style_preset: null,
    beforeImage: "lego_before.png",
    afterImage: "lego_after.png",
    cfg_scale: 35
}

const randomPrompt: PromptData = {
    title: "Random",
    prompt: "Ice cream texture, a man with a hat standing next to a blue car, with a blue sky and clouds",
    strength: 0.5,
    style_preset: null,
    beforeImage: "random_before.png",
    afterImage: "random_after.png",
    cfg_scale: 35
}


export const allPrompts = [
    disneyPrompt,
    pixarPrompt,
    toyStoryPrompt,
    legoPrompt,
    randomPrompt,
]
