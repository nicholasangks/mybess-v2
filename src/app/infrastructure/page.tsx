'use client';

import { useEffect, useState } from 'react';
import { api } from "@/helpers/apiHelper"
import H1 from "@/components/Heading/H1";
import H2 from '@/components/Heading/H2';
import Card from '@/components/Card';
import Label from '@/components/Label';
import { formatNumber } from '@/helpers/formatters';

async function getInfrastructure() {
    const res = await api('/infrastucture/', 'GET');
    return res
}

export default function Infrastructure() {
    const [infrastructure, setInfrastructure] = useState<any>([]);

    const init = async () => {
        let infrastructure = await getInfrastructure()

        setInfrastructure(infrastructure)
    }

    useEffect(() => {
        init();
    }, [])


    return (
        <div>
            <H1 text="Infrastructure" />
            <div className="grid grid-cols-5 gap-3">
                {infrastructure?.Lcs && (
                    <Card className="col-span-3">
                        <H2 text="Liquid Cooling System" />
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label text="Inlet Pressure" />
                                <div>{formatNumber(infrastructure.Lcs.incomingPressure, 1, '')}</div>
                            </div>
                            <div>
                                <Label text="Outlet Pressure" />
                                <div>{formatNumber(infrastructure.Lcs.outgoingPressure, 1, '')}</div>
                            </div>
                            <div>
                                <Label text="Inlet Temperature" />
                                <div>{formatNumber(infrastructure.Lcs.incomingTemp, 1, '')}</div>
                            </div>
                            <div>
                                <Label text="Outlet Temperature" />
                                <div>{formatNumber(infrastructure.Lcs.outgoingTemp, 1, '')}</div>
                            </div>
                            <div>
                                <Label text="Operation Mode" />
                                <div>{infrastructure.Lcs.runMode}</div>
                            </div>
                        </div>
                    </Card>
                )}

                {infrastructure?.enviroment && (
                    <Card className="col-span-2">
                        <H2 text="Environment Data" />
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label text="Temperature 1" />
                                <div>{formatNumber(infrastructure.enviroment.temp1, 1, '')}</div>
                            </div>
                            <div>
                                <Label text="Temperature 2" />
                                <div>{formatNumber(infrastructure.enviroment.temp2, 1, '')}</div>
                            </div>

                            <div>
                                <Label text="Humidity 1" />
                                <div>{formatNumber(infrastructure.enviroment.humi1, 1, '')}</div>
                            </div>

                            <div>
                                <Label text="Humidity 2" />
                                <div>{formatNumber(infrastructure.enviroment.humi2, 1, '')}</div>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {infrastructure?.system && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                    <Card>
                        <H2 text="Hvac" />
                        <div className="flex justify-between py-1">
                            <Label text="Humidity 2" />
                            <div>{infrastructure.system.hvac.remoteOnOff}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running Status" />
                            <div>{infrastructure.system.hvac.runningStatus}</div>
                        </div>
                    </Card>

                    <Card>
                        <H2 text="Temperature Sensor" />
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div>{infrastructure.system.temperatureSensor.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running Status" />
                            <div>{infrastructure.system.temperatureSensor.running}</div>
                        </div>
                    </Card>

                    <Card>
                        <H2 text="UPS" />
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div>{infrastructure.system.ups.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Capacity" />
                            <div>{infrastructure.system.ups.capacity}</div>
                        </div>
                    </Card>

                    <Card>
                        <H2 text="Dehumidifier" />
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div>{infrastructure.system.dehumidifier.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running" />
                            <div>{infrastructure.system.dehumidifier.running}</div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}