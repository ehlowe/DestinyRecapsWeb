
import styles from "./weekly_recaps.module.css";


function WeeklyRecap(weekly_recap) {

    console.log("DATES: ",weekly_recap.stream_dates_dict)
    return (
        <div className={styles.weekly_recap_wrapper}>
            <h2 className={styles.weekly_recap_hook}>{weekly_recap.week_hook}</h2>
            <p className={styles.weekly_recap_dates}>
                {/* unstructure the dictionary weekly_recap.stream_dates_dict*/}
                Stream Dates:
                {Object.entries(weekly_recap.stream_dates).map(([key, value]) => {
                    // hyperlinked value with the key ie https://www.youtube.com/watch?v={key}
                    return <a href={`https://destinyrecaps.com/details?video_id=${key}`}> {value}, </a>
                    
                })}
            </p>
            <img src={`data:image/png;base64,${weekly_recap.week_image}`} alt="weekly recap" />
        </div>
    )
}

export default WeeklyRecap;