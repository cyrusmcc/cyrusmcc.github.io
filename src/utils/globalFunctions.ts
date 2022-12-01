export const getImageUrl = (name: string) => {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}

export const getColorFilter = (index: number) => {
    let colorFilters: string[] = [
        'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(916%) hue-rotate(325deg) brightness(96%) contrast(106%)',
        'brightness(0) saturate(100%) invert(77%) sepia(55%) saturate(221%) hue-rotate(124deg) brightness(90%) contrast(87%)',
        'brightness(0) saturate(100%) invert(59%) sepia(19%) saturate(1159%) hue-rotate(151deg) brightness(95%) contrast(93%)',
        'brightness(0) saturate(100%) invert(59%) sepia(93%) saturate(794%) hue-rotate(101deg) brightness(92%) contrast(82%)',
        'brightness(0) saturate(100%) invert(83%) sepia(26%) saturate(4478%) hue-rotate(293deg) brightness(108%) contrast(102%)',
        'brightness(0) saturate(100%) invert(74%) sepia(31%) saturate(927%) hue-rotate(348deg) brightness(102%) contrast(94%)',
        'brightness(0) saturate(100%) invert(47%) sepia(40%) saturate(6634%) hue-rotate(348deg) brightness(104%) contrast(98%)'
    ]

    return colorFilters[index];
}

export const getColor = (index: number) => {
    const colors: string[] = ['#FDF5EF', '#83CDC5', '#47A3C6', '#17C778', '#FF91BD', '#F8B948', '#FD5621']
    return colors[index];
}

export const getRandomColor = () => {
    const colors: string[] = ['#83CDC5', '#47A3C6', '#17C778', '#FF91BD', '#F8B948', '#FD5621']
    return colors[Math.floor(Math.random() * colors.length)];
}

export const getRandomStarImg = () => {
    const imgArray: string[] = ['4ptstar.png', '8ptstar.png', 'comet.png', 'hllwstar.png']
    return imgArray[Math.floor(Math.random() * imgArray.length)];
}

