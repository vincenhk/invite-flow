'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";

interface MessagePanelProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MessagePanel({
                                         value,
                                         onChange
                                     }: MessagePanelProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Message Template</CardTitle>
                <CardDescription>
                    Configure WhatsApp message template.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

                <Textarea
                    rows={12}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />

                <div className="text-xs text-muted-foreground">

                    <p className="font-semibold mb-2">
                        Available Placeholder
                    </p>

                    <ul className="space-y-1">
                        <li>{"{recipient}"}</li>
                        <li>{"{url}"}</li>
                    </ul>

                </div>

            </CardContent>

        </Card>
    );
}