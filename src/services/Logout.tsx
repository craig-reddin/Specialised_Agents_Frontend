export async function logoutUser() {
  console.log(sessionStorage.getItem("SessionEmail"));
  console.log(sessionStorage.getItem("CurrentAgentOne"));
  console.log(sessionStorage.getItem("CurrentAgentTwo"));
  console.log(sessionStorage.getItem("CurrentAgentThree"));

  sessionStorage.removeItem("SessionEmail");
  sessionStorage.removeItem("CurrentAgentOne");
  sessionStorage.removeItem("CurrentAgentTwo");
  sessionStorage.removeItem("CurrentAgentThree");
}
