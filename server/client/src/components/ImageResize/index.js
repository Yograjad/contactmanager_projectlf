import React, {useState, useEffect} from "react";
import Resizer from "react-image-file-resizer";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

import {storage} from "../../config/firebaseConfig";
import {qualityList, resolutionList} from "../../assets/lists";

import Button from "../../components/Button";
import Select from "../Select";
import ButtonNLoading from "../../components/Button/ButtonNLoading";

const ImageResize = ({callback, update, photoGraph}) => {
	const [imageFile, setImageFile] = useState(null);
	const [resizeImage, setResizeImage] = useState({
		url: photoGraph || "",
		file: "",
	});

	const [quality, setQuality] = useState(100);
	const [resolution, setResolution] = useState({
		height: 200,
		width: 200,
	});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setImageFile(null);
		setResizeImage({
			url: photoGraph || "",
			file: "",
		});
		setQuality(100);
		setResolution({
			height: 200,
			width: 200,
		});
		setUploadURL("");
		setIsLoading(false);
		// setProgress(null);
	}, [update]);

	const [uploadURL, setUploadURL] = useState("");
	// const [progress, setProgress] = useState(null);

	useEffect(() => {
		const onResize = () => {
			if (imageFile) {
				try {
					Resizer.imageFileResizer(
						imageFile,
						300,
						300,
						"JPEG",
						quality,
						0,
						(uri) => {
							console.log(uri, quality);
							setResizeImage({
								url: URL.createObjectURL(uri),
								file: uri,
							});
						},
						"file",
						resolution.width,
						resolution.height
					);
				} catch (err) {
					console.log(err);
				}
			}
		};
		onResize();
	}, [imageFile, quality, resolution]);

	const fileChangedHandler = (event) => {
		console.log("URL", URL.createObjectURL(event.target.files[0]));
		setImageFile(event.target.files[0]);
	};

	const handleUpload = () => {
		// console.log(this.state.image);
		setIsLoading((prev) => !prev);
		let userId = "idididi2";
		console.log("handleupload", resizeImage.file);
		let file = resizeImage.file;
		const storageRef = ref(storage, `/${userId}/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// const progress = Math.round(
				// 	(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				// );
			},
			(error) => console.log(error),
			() => {
				// setProgress(100);
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log("URL", url);
					callback(url);
					setUploadURL(url);
					setIsLoading((prev) => !prev);
				});
			}
		);
	};

	return (
		<div className="bg-slate-100 p-4 md:p-10 rounded">
			<input id="uploadImage" type="file" onChange={fileChangedHandler} />

			{resizeImage.url && (
				<div className="flex flex-col md:flex-row items-center mt-6">
					<div className="w-1/2 ">
						<img src={resizeImage.url} alt="profile pic" />
					</div>
					<div className="w-1/2  flex flex-col justify-start items-center ">
						<div className="flex items-center">
							<div className="w-40 mr-4">
								<Select
									label="Quality"
									error=""
									value={quality}
									onChange={(e) => setQuality(e.target.value)}
									options={qualityList}
								/>
							</div>
							<div className="w-40">
								<Select
									label="Resolution"
									error=""
									value={resolution.height}
									onChange={(e) =>
										setResolution({
											width: e.target.value,
											height: e.target.value,
										})
									}
									options={resolutionList}
								/>
							</div>
						</div>
						{uploadURL ? (
							<p className="bg-green-100 text-green-500 font-normal rounded-md p-2">
								Uploaded
							</p>
						) : (
							<div>
								{/* <Button label="Upload Storage" onClick={handleUpload} /> */}
								<ButtonNLoading
									title="Upload Storage"
									onClick={handleUpload}
									isLoading={isLoading}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageResize;
