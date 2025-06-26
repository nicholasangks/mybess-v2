'use client';

import { useEffect, useState } from 'react';
import { api } from "@/helpers/apiHelper"
import ContentWrapper from '@/components/ContentWrapper';
import H2 from '@/components/Heading/H2';
import Card from '@/components/Card';
import Label from '@/components/Label';
import { formatNumber } from '@/helpers/formatters';
import { PiDropSimpleBold, PiDropHalf, PiDropSlashBold, PiThermometerSimple, PiBatteryChargingBold } from "react-icons/pi";
import { LuFan } from "react-icons/lu";
import IconWrapper from '@/components/IconWrapper';

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
        <ContentWrapper title="Infrastructure" >
            <div className="grid grid-cols-5 gap-3">
                {infrastructure?.Lcs && (
                    <Card className="col-span-3">
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <PiDropSimpleBold className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="Liquid Cooling System" className="!mb-0" />
                        </div>
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
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <PiDropHalf className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="Environment Data" className="!mb-0" />
                        </div>
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
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <LuFan className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="HVAC" className="!mb-0" />
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Humidity 2" />
                            <div className="text-right">{infrastructure.system.hvac.remoteOnOff}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running Status" />
                            <div className="text-right">{infrastructure.system.hvac.runningStatus}</div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <PiThermometerSimple className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="Temperature Sensor" className="!mb-0" />
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div className="text-right">{infrastructure.system.temperatureSensor.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running Status" />
                            <div className="text-right">{infrastructure.system.temperatureSensor.running}</div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <PiBatteryChargingBold className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="UPS" className="!mb-0" />
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div className="text-right">{infrastructure.system.ups.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Capacity" />
                            <div className="text-right">{infrastructure.system.ups.capacity}</div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center mb-3">
                            <IconWrapper>
                                <PiDropSlashBold className="text-[1.3rem] font-bold" />
                            </IconWrapper>
                            <H2 text="Dehumidifier" className="!mb-0" />
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Status" />
                            <div className="text-right">{infrastructure.system.dehumidifier.status}</div>
                        </div>
                        <div className="flex justify-between py-1">
                            <Label text="Running" />
                            <div className="text-right">{infrastructure.system.dehumidifier.running}</div>
                        </div>
                    </Card>
                </div>
            )}
        </ContentWrapper>
    )
}