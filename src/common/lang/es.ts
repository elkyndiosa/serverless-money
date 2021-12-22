const TRASLATE = {
  
};
function traslateText(string: string) {
  return TRASLATE[string] ? TRASLATE[string] : string;
}
export default traslateText;
