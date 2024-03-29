export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const genders = [
    'male', 'female', 'other'
]

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];



export const monthOptions = monthNames.map((item) => ({
    value: item,
    label: item,
}));

export const genderOptions = genders.map(gender => ({
    value: gender,
    label: gender
}))

export const bloodGroupOptions = bloodGroups.map(bloodGroup => ({
    value: bloodGroup,
    label: bloodGroup
}))

export const weekDaysOptions = weekdays.map((item) => ({
    value: item,
    label: item,
}));