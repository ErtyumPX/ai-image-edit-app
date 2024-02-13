export interface Prompt {
    title: string,
    prompt: string,
    beforeImage: string,
    afterImage: string
}

const disneyPrompt: Prompt = {
    title: "Disney",
    prompt: "A Disney character",
    beforeImage: "disney_before.png",
    afterImage: "disney_after.png"
}

const pixarPrompt: Prompt = {
    title: "Pixar",
    prompt: "A Pixar character",
    beforeImage: "pixar_before.png",
    afterImage: "pixar_after.png"
}

const pokemonPrompt: Prompt = {
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