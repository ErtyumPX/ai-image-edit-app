export interface PromptData {
    title: string,
    prompt: string,
    beforeImage: string,
    afterImage: string
}


const disneyPrompt: PromptData = {
    title: "Disney",
    prompt: "A Disney character",
    beforeImage: "disney_before.png",
    afterImage: "disney_after.png"
}

const pixarPrompt: PromptData = {
    title: "Pixar",
    prompt: "A Pixar character",
    beforeImage: "pixar_before.png",
    afterImage: "pixar_after.png"
}

const pokemonPrompt: PromptData = {
    title: "Pokemon",
    prompt: "A Pokemon",
    beforeImage: "pokemon_before.png",
    afterImage: "pokemon_after.png"
}


export const allPrompts = [
    disneyPrompt,
    pixarPrompt,
    pokemonPrompt
]
