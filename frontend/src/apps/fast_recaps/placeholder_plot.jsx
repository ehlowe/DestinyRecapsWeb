function return_placeholder_object() {
    var slowDetails={}
    slowDetails.plot_object={
        plot_parameters: {
            background_color: 0x606060,
            plotting_width: 10,
            plotting_height: 10,
            bar_height_setting: 0.15,
            upper_y: 0.55,
            lower_y: 0.7,
            circle_size_multiplier: 0.1,
            circle_size_offset: 0.08,
            abstraction_width_cutoff: 0.05,
            central_y: 0.7,
            video_id: "s82MKbp-R8w"
        },
        time_normalization: {
            start_offset: 28960,
            net_duration: 8187839
        },
        segments: [
            {
                category: "^ Do the thing",
                color: "#006fcd",
                start_time: 0,
                end_time: 1,
                width: 1.0,
                x: 0.5,
                texts: [
                    "The raw text of the segment"
                ],
                annotations: [
                    "A bit shorter and simplier than the recap."
                ],
                href: "https://youtu.be/dQw4w9WgXcQ?t=0",
                recap: "This is the segment recap, clicking on this will pop up the video at the timestamp of this segment."
            },
        ],
        abstractions: {
            "^ Do the thing": {
                width: 1.0,
                color: "#006fcd",
                x: 0.5,
                y: 0.7,
                size: 0.20099283798804707,
                recap: "This the abstraction recap, it summarizes the content of all the contained segments."
            },
        }
    }
    return slowDetails;
}

export default return_placeholder_object;