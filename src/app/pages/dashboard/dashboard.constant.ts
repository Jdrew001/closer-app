export class DashboardConstant {
    public static DAY_DEFINITION = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
    }

    public static DATA = {
        title: "Weekly Overview",
        data: [
            {
                "subTitle": "Mar 25 - Mar 31",
                "startDate": "03/25/2022",
                "endDate": "03/31/2022",
                "graphData": [
                    {
                        key: 'Sun',
                        value: 100,
                        "date": "03/31/2022"
                    },
                    {
                        key: 'Mon',
                        value: 20,
                        "date": "03/25/2022"
                    },
                    {
                        key: 'Tue',
                        value: 50,
                        "date": "03/26/2022"
                    },
                    {
                        key: 'Wed',
                        value: 85,
                        "date": "03/27/2022"
                    },
                    {
                        key: 'Thu',
                        value: 40,
                        "date": "03/28/2022"
                    },
                    {
                        key: 'Fri',
                        value: 55,
                        "date": "03/29/2022"
                    },
                    {
                        key: 'Sat',
                        value: 20,
                        "date": "03/30/2022"
                    }
                ],
                selected: false,
                defaultSelected: "M",
                keys: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            {
                "subTitle": "Apr 1 - Apr 7",
                "startDate": "04/01/2022",
                "endDate": "04/07/2022",
                "graphData": [
                    {
                        key: 'Sun',
                        value: 100,
                        "date": "04/01/2022"
                    },
                    {
                        key: 'Mon',
                        value: 20,
                        "date": "04/02/2022"
                    },
                    {
                        key: 'Tue',
                        value: 50,
                        "date": "04/03/2022"
                    },
                    {
                        key: 'Wed',
                        value: 50,
                        "date": "04/04/2022"
                    },
                    {
                        key: 'Thu',
                        value: 40,
                        "date": "04/05/2022"
                    },
                    {
                        key: 'Fri',
                        value: 55,
                        "date": "04/06/2022"
                    },
                    {
                        key: 'Sat',
                        value: 20,
                        "date": "04/07/2022"
                    }
                ],
                selected: true,
                defaultSelected: "W",
                keys: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            {
                "subTitle": "Apr 8 - Apr 14",
                "startDate": "04/08/2022",
                "endDate": "04/14/2022",
                "graphData": [
                    {
                        key: 'Sun',
                        value: 100,
                        "date": "04/04/2022"
                    },
                    {
                        key: 'Mon',
                        value: 20,
                        "date": "04/08/2022"
                    },
                    {
                        key: 'Tue',
                        value: 50,
                        "date": "04/09/2022"
                    },
                    {
                        key: 'Wed',
                        value: 85,
                        "date": "04/10/2022"
                    },
                    {
                        key: 'Thu',
                        value: 40,
                        "date": "04/11/2022"
                    },
                    {
                        key: 'Fri',
                        value: 55,
                        "date": "04/12/2022"
                    },
                    {
                        key: 'Sat',
                        value: 20,
                        "date": "04/13/2022"
                    }
                ],
                selected: false,
                defaultSelected: "M",
                keys: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
        ],
        animation: true,
        "total": 3
    }
}