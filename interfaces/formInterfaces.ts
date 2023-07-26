interface GenericOptionPair {
    label: string;
    value: string;
}

interface GendersPerLanguage {
    [key: string]: GenericOptionPair[];
}

interface SalutationsPerLanguage {
    [key: string]: String[];
}