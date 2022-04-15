import cn from './Editor.module.scss';

const Editor = () => {
	return (
		<div className={cn.container}>
			{/* <div className={cn.logo}>
				Music<span className={cn.orange}>Hub</span>
			</div> */}
			<div className={cn.tracks}></div>
		</div>
	);
};

export default Editor;
