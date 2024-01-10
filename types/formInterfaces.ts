interface GenericOptionPair {
    label: string;
    value: string;
}

interface GenericOptionPairWithReference {
    label: string;
    value: string;
    ref: string;
}

interface GendersPerLanguage {
    [key: string]: GenericOptionPair[];
}

interface SalutationsPerLanguage {
    [key: string]: String[];
}