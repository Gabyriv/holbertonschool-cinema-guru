import PropTypes from "prop-types"
import "./components.css"

/**
 * Activity component - Displays a single user activity item
 * Formats the activity text based on activity type
 * Format: "{username} added {title} to {listType} - {date}"
 */
function Activity({ activity }) {
    // Extract data from activity object
    const username = activity.user?.username || "User"
    const title = activity.title?.title || "Unknown"
    const activityType = activity.activityType
    const date = new Date(activity.createdAt)

    // Format the date (e.g., "March 28, 2022")
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    /**
     * Get the action text and list type based on activity type
     * @returns {object} Object with action and listType
     */
    const getActivityParts = () => {
        switch (activityType) {
            case "favorite":
                return { action: "added", listType: "to favorites" }
            case "watchLater":
                return { action: "added", listType: "to watch later" }
            case "removeFavorited":
                return { action: "removed", listType: "from favorites" }
            case "removeWatchLater":
                return { action: "removed", listType: "from watch later" }
            default:
                return { action: "interacted with", listType: "" }
        }
    }

    const { action, listType } = getActivityParts()

    return (
        <li className="activity-item">
            <p className="activity-text">
                <span className="activity-username">{username}</span>
                {" "}{action}{" "}
                <span className="activity-title">{title}</span>
                {" "}{listType} - {formattedDate}
            </p>
        </li>
    )
}

Activity.propTypes = {
    activity: PropTypes.shape({
        user: PropTypes.shape({
            username: PropTypes.string
        }),
        title: PropTypes.shape({
            title: PropTypes.string
        }),
        activityType: PropTypes.string,
        createdAt: PropTypes.string
    }).isRequired,
}

export default Activity
