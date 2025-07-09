import { useEffect, useState } from "react";
import { getTime } from "../../utils/clockUtils";
import styles from "./clock.module.scss";

const Clock = () => {
	const locale = new Intl.Locale(navigator.language);
	const hourCycles = locale.hourCycle ?? locale.getHourCycles();
	const is12HourFormat = ["h11", "h12"].some(hourCycle => hourCycles.includes(hourCycle));

	const [currentTime, setCurrentTime] = useState(getTime(new Date(), is12HourFormat));

	useEffect(() => {
		let ref = setInterval(() => {
			let currentTimeObj = new Date();
			setCurrentTime(getTime(currentTimeObj, is12HourFormat));
		}, 1000);
		return () => clearInterval(ref);
	}, []);

	return (
		<div className={styles.clock}>
			{currentTime.time}
			{is12HourFormat ? (
			<span className={styles.meridiem}>{currentTime.meridiem}</span>
      ) : ''}
		</div>
	);
};

export default Clock;
