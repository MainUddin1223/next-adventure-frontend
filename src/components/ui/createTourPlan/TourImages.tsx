import { getErrorMessageByPropartyName } from '@/utils/schemaValidator';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageUploadProps } from '../types';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const TourImagesUploader = ({ name }: ImageUploadProps) => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const { setValue } = useFormContext();
	const [loading, setLoading] = useState(false);

	const {
		formState: { errors },
	} = useFormContext();

	const errorMessage = getErrorMessageByPropartyName(errors, name);

	const handleChange: UploadProps['onChange'] = (
		info: UploadChangeParam<UploadFile>
	) => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, (url) => {
				uploadToCloudinary(url, info.file.originFileObj);
			});
		}
	};

	const uploadToCloudinary = (url: any, infoFile: any) => {
		const data = new FormData();
		data.append('file', infoFile);
		data.append('upload_preset', 'nextAdventure');
		data.append('cloud_name', 'dld6ete1x');
		fetch('https://api.cloudinary.com/v1_1/dld6ete1x/image/upload', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				imageUrls.push(data.url);
				setValue(name, imageUrls);
			})
			.catch((error) => console.log(error));
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<>
			<div style={{ display: 'block', margin: '0 auto' }}>
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="/api/file"
					beforeUpload={beforeUpload}
					onChange={handleChange}
				>
					{uploadButton}
				</Upload>
				<small style={{ color: 'red' }}>{errorMessage}</small>
				<div>
					{imageUrls.length > 0 ? (
						<div>
							{imageUrls.map((img, i) => (
								<Image key={i} src={img} alt="img" height={100} width={100} />
							))}
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</>
	);
};

export default TourImagesUploader;
