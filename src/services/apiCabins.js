import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabins could not be deleted");
  return data;
}

export async function insertCabins(cabin) {
  if (typeof cabin.image === "string") {
    const { data, error } = await supabase.from("cabins").insert([cabin]);
    if (error) throw Error("Cabins could not be inserted");
    return data;
  }
  const imageName = `${Math.random()}-${cabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }]);
  if (error) throw Error("Cabins could not be inserted");
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image[0]);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw Error("Image could not be uploaded");
  }
  return data;
}

export async function updateCabins(id, cabin) {
  if (typeof cabin.image === "string") {
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...cabin })
      .eq("id", id)
      .select();
    if (error) throw Error("Cabins could not be updated");
    return data;
  } else {
    const imageName = `${Math.random()}-${cabin.image[0].name}`.replaceAll(
      "/",
      ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id)
      .select();
    if (error) throw Error("Cabins could not be updated");
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image[0]);
    if (storageError) {
      await supabase.from("cabins").update({ image: null }).eq("id", id);
      throw Error("Image could not be uploaded");
    }
    return data;
  }
}
