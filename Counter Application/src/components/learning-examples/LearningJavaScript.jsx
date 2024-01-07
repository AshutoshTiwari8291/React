const person = {
    name: 'Ashutosh',
    address: {
        line: 'Baker Street',
        city: 'London',
        country: 'UK'
    },
    profiles: ['twitter', 'linkedin'],
    printProfile: () => {
        person.profiles.map(
            (profile) => {
                console.log(profile);
            }
        );
    }
}

export default function LearningJavaScript() {
    return (
        <div>
            Learning JavaScript
            <div>{person.name}</div>
            <div>{person.address.line}</div>
            <div>{person.printProfile()}</div>
        </div>
    )
}