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
            <div className={clsx(cn.level, level >= 0.8 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.6 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.4 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.2 && cn.on)}></div>
            <div className={clsx(cn.level, level >= 0.1 && cn.on)}></div>
        </div>
    );
}

export default SoundMeter;

