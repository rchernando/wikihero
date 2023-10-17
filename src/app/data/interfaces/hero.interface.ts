export interface HeroInterface {
    id: string, 
    created: string,
    name: string,
    secret_identity: string
}

export interface HeroDialogData {
    type: string,
    hero: HeroInterface
}