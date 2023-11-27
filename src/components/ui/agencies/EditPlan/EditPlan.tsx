'use client';

import { useUpdatePlanByIdMutation } from '@/redux/api/agencyApi';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, Input, Modal, Tag, message } from 'antd';
import { useEffect, useState } from 'react';

interface IUpdatedData {
	totalSeats: number;
	description: string;
	notAllowed: string[];
}

interface IEditPlanProps {
	open: boolean;
	setOpen: (val: boolean) => void;
	data: IUpdatedData;
	id: number;
}

const EditPlan = ({ open, setOpen, data, id }: IEditPlanProps) => {
	const [tag, setTag] = useState('');
	const [updatePlanById] = useUpdatePlanByIdMutation();
	const [updatedData, setUpdatedData] = useState<IUpdatedData>(data);
	const [newTags, setNewTags] = useState<string[]>([]);

	useEffect(() => {
		setNewTags([...updatedData.notAllowed])
	},[])

	const handleUpdate = async () => {
		try {
			const res = await updatePlanById({ id, updatedData:{...updatedData, notAllowed: newTags} }).unwrap();
			if (res?.success) {
				setOpen(false);
				message.success('Tour plan Updated successfully');
			}
			if (!res.success) {
				Modal.error({
					content: 'Failed to update',
				});
			}
		} catch (error) {}
	};

	const addTags = () => {
		setNewTags([...newTags, tag]);
		setTag('');
	};

	const removeTags = (value: string) => {
		if(newTags.includes(value)){
			const updatedTags = newTags.filter((vl) => vl !== value);
			setNewTags(updatedTags)
		}
	};
	
	return (
		<div>
			<Drawer
				title="Update plan"
				placement="left"
				closeIcon={
					<CloseCircleOutlined
						style={{
							fontSize: '35px',
							color: 'var(--button-color)',
							position: 'absolute',
							right: '15px',
							top: '10px',
						}}
					/>
				}
				onClose={() => setOpen(false)}
				open={open}
				key="left"
				style={{ backgroundColor: 'white', textAlign: 'center' }}
			>
				<div style={{ textAlign: 'left' }}>
					<div style={{ margin: '10px 0' }}>
						<p style={{ padding: '10px 0', fontSize: '18px' }}>Updated seats</p>
						<Input
							type="number"
							value={updatedData.totalSeats}
							onChange={(e) =>
								setUpdatedData({
									...updatedData,
									totalSeats: Number(e.target.value),
								})
							}
						/>
					</div>
					<div>
						<p style={{ padding: '10px 0', fontSize: '18px' }}>Updated seats</p>
						<Card style={{ width: '100%' }}>
							{newTags?.length ? (
								newTags.map((value, i) => (
									<Tag
										key={i}
										closeIcon={<CloseCircleOutlined />}
										onClose={(e) => {
											e.preventDefault()
											removeTags(value);
										}}
									>
										{value}
									</Tag>
								))
							) : (
								<></>
							)}
							<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
								<Input
									value={tag}
									placeholder="Add new not allowed activities"
									onChange={(e) => setTag(e.target.value)}
								/>
								<Button
									disabled={!tag && true}
									onClick={addTags}
								>Add</Button>
							</div>
						</Card>
					</div>
					<div>
						<p style={{ padding: '10px 0', fontSize: '18px' }}>
							Update Description
						</p>
						<Input.TextArea
							value={updatedData.description}
							onChange={(e) =>
								setUpdatedData({ ...updatedData, description: e.target.value })
							}
							autoSize={{ minRows: 4, maxRows: 5 }}
							placeholder="Description"
						/>
					</div>
				</div>
				<Button
					style={{ margin: '20px 0' }}
					type="primary"
					onClick={() => handleUpdate()}
				>
					Update
				</Button>
			</Drawer>
		</div>
	);
};

export default EditPlan;
