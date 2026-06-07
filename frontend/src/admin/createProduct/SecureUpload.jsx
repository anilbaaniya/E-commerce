// import { useState } from "react";
// import { Audio } from "react-loader-spinner";
// import { getSignatureForUpload } from "../../services/getSignature.js";
// import axios from "axios";

// export default function SecureUpload() {
//   const [img, setImg] = useState(null);
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function uploadImage(timestamp, signature) {
//     const data = new FormData();

//     if (!img) throw new Error("Image file missing");

//     data.append("file", img);
//     data.append("timestamp", timestamp);
//     data.append("signature", signature);
//     data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
//     data.append("folder", "images");

//     try {
//       const cloudName = import.meta.env.VITE_CLOUD_NAME;

//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//       const res = await axios.post(api, data);

//       const { secure_url } = res.data;

//       console.log(secure_url);

//       return secure_url;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // Get signature for image upload
//       const { timestamp, signature } = await getSignatureForUpload("images");

//       if (timestamp || signature) {
//         throw new Error("Failed to get image upload signature");
//       }

//       // Upload image
//       const imgUrl = await uploadImage(timestamp, signature);

//       // Send backend API request
//       await axios.post("/api/image", {
//         imgUrl,
//         name,
//         age,
//       });

//       setImg(null);
//       setName("");
//       setAge("");

//       console.log("Image uploaded successfully!");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="img">Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             id="img"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//         </div>

//         <br />

//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <br />

//         <div>
//           <label htmlFor="age">Age:</label>
//           <input
//             type="number"
//             id="age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </div>

//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form>

//       {loading && (
//         <Audio
//           height="80"
//           width="80"
//           color="#4fa94d"
//           ariaLabel="audio-loading"
//           visible={true}
//         />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Audio } from "react-loader-spinner";
import axios from "axios";

import { getSignatureForUpload } from "../../services/getSignature.js";

export default function SecureUpload() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Upload image
  async function uploadImage(file, timestamp, signature) {
    const data = new FormData();

    data.append("file", file);
    data.append("timestamp", timestamp);
    data.append("signature", signature);
    data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    data.append("folder", "images");

    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;

      const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);

      return res.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  }

  // Submit
  async function onSubmit(formData) {
    try {
      setLoading(true);

      // File from RHF
      const file = formData.img[0];

      if (!file) {
        throw new Error("Image missing");
      }

      // Get signature
      const { timestamp, signature } = await getSignatureForUpload("images");

      if (!timestamp || !signature) {
        throw new Error("Failed to get upload signature");
      }

      // Upload image
      const imgUrl = await uploadImage(file, timestamp, signature);

      // Send to backend
      await axios.post("/api/image", {
        imgUrl,
        name: formData.name,
        age: formData.age,
      });

      console.log("Uploaded successfully");

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image */}
        <div>
          <label htmlFor="img">Image:</label>

          <input
            type="file"
            accept="image/*"
            id="img"
            {...register("img", {
              required: "Image is required",
            })}
          />

          {errors.img && <p>{errors.img.message}</p>}
        </div>

        <br />

        {/* Name */}
        <div>
          <label htmlFor="name">Name:</label>

          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <br />

        {/* Age */}
        <div>
          <label htmlFor="age">Age:</label>

          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Age is required",
            })}
          />

          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {loading && (
        <Audio
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="audio-loading"
          visible={true}
        />
      )}
    </div>
  );
}
