'use client';
import { Rate } from 'antd';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IRatingProps } from '../types';

const RatingCompo = ({ name, desc }: IRatingProps) => {
	const [rating, setRating] = useState(5);
	const { setValue } = useFormContext();
	setValue(name, rating);
	return (
		<div>
			<Rate
				style={{ margin: '15px 0', color: 'var(--button-color)' }}
				tooltips={desc}
				onChange={(e) => {
					setRating;
					setRating(e.valueOf());
				}}
				value={rating}
			/>
		</div>
	);
};

export default RatingCompo;
