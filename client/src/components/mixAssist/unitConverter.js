
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

export default oz2ml;