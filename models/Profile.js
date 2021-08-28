const Mongoose = require('mongoose');

// Basic information of a user
const ProfileSchema = new Mongoose.Schema({
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    portfolio: {
        type: String
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    // Profession - student, teacher, developer, etc
    profession: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    GitHub_User: {
        type: String
    },
    LinkedIn_User: {
        type: String
    },

    // Have users enter in their work experience
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            skillsUsed: {
                type: [String]
            }
        }
    ],
    // Have users enter their education info
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            // Discipline: Field of Study (major, course topic)
            discipline: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                deafult: false
            },
            description: {
                type: String
            },
            skills: {
                type: [String]
            }
        }
    ],

    // Social Media Links
    socialMedia: {
        linkedin: {
            type: String
        },
        github: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        date: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = Profile = Mongoose.model('profile', ProfileSchema);