import type { ReactElement } from 'react';
import clsx from 'clsx';
import cn from './SoundMeter.module.scss';

interface SoundMeterProps {
    level: number;
}

const SoundMeter = ({level}: SoundMeterProps): ReactElement => {
    return (
        <div className={cn.container}>
            <div className={clsx(cn.level, level >= 0.9 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.7 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.45 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.3 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.10 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.05 && cn.on)}></div>
        </div>
    );
}

export default SoundMeter;

