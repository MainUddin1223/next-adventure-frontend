'use client';

import { getErrorMessageByPropartyName } from '@/utils/schemaValidator';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Tag } from 'antd';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface IInput {
	type?: string;
	name: string;
	size?: 'large' | 'small';
	value?: string | string[] | undefined;
	id?: string;
	placeholder?: string;
	validation?: string;
	label?: string;
	style?: {};
}

const TagMaker = ({
	name,
	type,
	size,
	value,
	id,
	placeholder,
	validation,
	label,
}: IInput) => {
	const [tag, setTag] = useState('');
	const [newTags, setNewTags] = useState<string[]>([]);
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();
	const errorMessage = getErrorMessageByPropartyName(errors, name);

	const addTags = () => {
		newTags.push(tag);
		setTag('');
		setValue(name, newTags);
	};

	const removeTags = (value: string) => {
		newTags.map((vl, i) => {
			if (vl == value) {
				newTags.splice(i, 1);
				setValue(name, newTags);
			}
		});
	};

	return (
		<>
			{label ? label : null}
			<Card style={{ width: '100%' }}>
				{newTags.length ? (
					newTags.map((value, i) => (
						<Tag
							key={i}
							closeIcon={<CloseCircleOutlined />}
							onClose={() => {
								removeTags(value);
							}}
						>
							{value}
						</Tag>
					))
				) : (
					<></>
				)}
				<div style={{ width:'250px',display: 'flex', gap: '10px', marginTop: '10px' }}>
					<Input
						
						value={tag}
						placeholder={placeholder}
						onChange={(e) => setTag(e.target.value)}
					/>
					<Button onClick={addTags}>Add</Button>
				</div>
			</Card>
			<small style={{ color: 'red' }}>{errorMessage}</small>
		</>
	);
};

export default TagMaker;
