import supabase from "../Services/supabaseClient.js";

export async function getUser() {
  await supabase.auth.signOut();
  console.log("Déconnecté");
}



const profilModel = {
  getUser,
  //   login,
  //   logout,
};
export default profilModel;
