import react from "react"
import { Card, CardHeader } from "reactstrap"
export const Leaderboard = ({ leaders }) => {

    return (
        <div>
            {
                leaders ? leaders.map((obj) => {
                    return (
                        <Card key={obj.streak.id}>
                            <CardHeader>{obj.length.totalDays} Days - {obj.streak.userProfile.username} </CardHeader>
                        </Card>
                    )
                })
                    : null
            }


        </div>




    )

}