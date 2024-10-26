import logger from "pino"
import dayjs from "dayjs"

const log = logger({
    base: {
        pid: false,
    },
    timestamp: () => `,"time": "${dayjs().format()}"`,
    transport: {
        target: 'pino-pretty', // This is used to format the logs
        options: {
            colorize: true, // Colors for readability
        }
        }
})

export default log;