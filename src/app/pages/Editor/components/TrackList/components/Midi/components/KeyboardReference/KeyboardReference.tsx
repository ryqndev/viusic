import { ReactElement, useState } from 'react';
import cn from './KeyboardReference.module.scss';

interface KeyboardReferenceProps {
	hi: string;
	range: number;
}

const notes = ['b', 'a#', 'a', 'g#', 'g', 'f#', 'f', 'e', 'd#', 'd', 'c#', 'c'];

const KeyboardReference = ({
	hi,
	range,
}: KeyboardReferenceProps): ReactElement => {
	const getNotes = () => {
		let octave = parseInt(hi.replace(/\D/g, ''));
		let n = [],
			idx = notes.indexOf(hi.substring(0, hi.length - 1));
		for (let i = 0; i < range; i++) {
			n.push({ note: notes[(idx + i) % 12], octave: octave });
			if ((idx + i) % 12 === 11) octave -= 1;
		}
		return n;
	};

	const [keys] = useState(getNotes);

	return (
		<div className={cn.container}>
			{keys.map((key, idx) => (
				<div
					key={idx}
					className={cn.key}
					style={{
						backgroundColor:
							key.note.length === 1 ? 'white' : 'black',
						color: key.note.length === 1 ? 'black' : 'white',
					}}
				>
					<span>
						{key.note}
						{key.octave}
					</span>
				</div>
			))}
		</div>
	);
};

export default KeyboardReference;
