import { useState, useEffect, useCallback } from 'react'
import usePlayback from '../../../../../controllers/usePlayback';
import useTracks from '../../../../../controllers/useTracks';

const useRecorder = (trackid: string, recordid: string, data: Blob[] | undefined) => {
    const [recorder, setRecorder] = useState<null | MediaRecorder>(null);
    const [audioBlobs, setAudioBlobs] = useState<Blob[]>(data ?? []);
    const [recorderState, setRecorderState] = useState('inactive');
    const {editTrack} = useTracks();
    const [audioURL, setAudioURL] = useState<null | string>(null);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<null | string>(null);
    const { play } = usePlayback();

    useEffect(() => {
        if (audioBlobs.length <= 0) return;
        const blob = new Blob(audioBlobs, { 'type': 'audio/ogg; codecs=opus' });
        let url = window.URL.createObjectURL(blob)
        setAudioURL(url);

        editTrack(recordid, trackid, {data: audioBlobs});
        
    }, [recordid, trackid, editTrack, audioBlobs]);

    useEffect(() => {
        if (!recorder) return;

        recorder.ondataavailable = function (e) {
            setAudioBlobs((prevAudioBlobs: Blob[]) => [...prevAudioBlobs, e.data]);
        }
    }, [recorder]);

    const recordInput = useCallback(() => {
        if (!recorder) return;

        if (recorder?.state === 'recording') {
            play();
            recorder.stop();
            setRecorderState(recorder.state);
            return;
        }

        if (audioURL) {
            window.URL.revokeObjectURL(audioURL);
            setAudioURL(null);
        }
        setAudioBlobs([]);

        recorder.start();
        play();
        setRecorderState(recorder.state);
    }, [audioURL, recorder, play]);

    const selectInput = (id: string) => {
        setSelectedDeviceId(id);
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
            return console.log('usermedia not supported. Use chrome instead.');

        navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: { exact: id },
                noiseSuppression: false,
            }
        }).then((stream) => {
            setRecorder(new MediaRecorder(stream));
        }).catch(console.error);
    };

    useEffect(() => {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices: any) => {
                setAvailableDevices(
                    devices.filter((dev: any) => dev.kind === 'audioinput' && dev.deviceId !== 'default')
                );
            })
            .catch(console.error);
    }, []);

    return {
        setSelectedDeviceId,
        selectedDeviceId,
        availableDevices,
        recorder,
        recorderState,
        recordInput,
        selectInput,
        audioURL,
    }
}

export default useRecorder;
