
// all functions return in ml or grams
function oz2ml(oz) {
    return 28.4131*Number(oz);
}
function limeJuice(limes) {
    return Number(limes) * 35.5164;
}
function lemonJuice(lemons) {
    return Number(lemons) * 53.2746;
}
function orangeJuice(oranges) {
    return Number(oranges) * 71.0328;
}
function grams2ml(gramsOf80proof) {
    return Number(gramsOf80proof)/.94;
}
// function limeZest(limes) {
//     return Number(limes) *
// }

const glasses = {
    'Highball glass': 350,
    'Cocktail glass': 250,
    'Old-fashioned glass': 250,
    'Collins glass': 350,
    'Pousse cafe glass': 0,
    'Champagne flute': 200,
    'Whiskey sour glass': 0,
    'Brandy snifter': 350,
    'White wine glass': 0,
    'Nick and Nora Glass': 0,
    'Hurricane glass': 300,
    'Coffee mug': 0,
    'Shot glass': 25,
    'Double-shot glass': 50,
    'Jar': 0,
    'Irish coffee cup': 0,
    'Punch bowl': 0,
    'Pitcher': 0,
    'Pint glass': 0,
    'Copper Mug': 0,
    'Wine Glass': 250,
    'Cordial glass': 0,
    'Beer mug': 0,
    'Margarita/Coupette glass': 300,
    'Beer pilsner': 300,
    'Stein glass': 300,
    'Beer Glass': 400,
    'Parfait glass': 0,
    'Mason jar': 0,
    'Margarita glass': 0,
    'Martini Glass': 250,
    'Balloon Glass': 0,
    'Coupe Glass': 0,
};

export {oz2ml, glasses};