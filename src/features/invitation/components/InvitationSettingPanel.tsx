'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {InvitationSettings, UrlStrategy} from "@/features/invitation/invitation-settings";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UrlMapping} from "@/features/invitation/url-mapping";
import {Button} from "@/components/ui/button";

interface InvitationSettingPanelProps {
    value: InvitationSettings;
    onChange: (value: InvitationSettings) => void;
}

export default function InvitationSettingPanel({value, onChange}: InvitationSettingPanelProps) {

    const guestFieldOptions = [
        {
            value: "recipient",
            label: "Recipient"
        },
        {
            value: "phone",
            label: "Phone"
        },
        {
            value: "slug",
            label: "Slug"
        },
        {
            value: "status",
            label: "Status"
        }
    ];

    function updateMapping(
        index: number,
        mapping: UrlMapping
    ) {
        const mappings = [...value.mapping];
        mappings[index] = updatedMapping;

        onChange({
            ...value,
            mapping: mappings
        });
    }

    function createEmptyMapping(): UrlMapping {
        return {
            key: "",
            source: "recipient"
        };
    }

    function addMapping() {
        onChange({
            ...value,
            mapping: [
                ...value.mapping,
                createEmptyMapping()
            ]
        });
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Invitation Settings</CardTitle>
                    <CardDescription>
                        Configuration how invitation URLs are Generated.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Base URL
                        </label>

                        <Input placeholder="Input URL"
                               value={value.baseUrl}
                               onChange={(e) =>
                                   onChange({
                                       ...value,
                                       baseUrl: e.target.value
                                   })
                               }
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Strategy
                        </label>

                        <Select
                            value={value.strategy}
                            onValueChange={(strategy) =>
                                onChange({
                                    ...value,
                                    strategy: strategy as UrlStrategy
                                })
                            }>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="QUERY">
                                    Query Parameter
                                </SelectItem>

                                <SelectItem value="PATH">
                                    Path Variable
                                </SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </CardContent>
            </Card>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Field Mapping</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {value.mapping.map((mapping, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Input
                                    value={mapping.key}
                                    onChange={(e) =>
                                        updateMapping(index, {
                                            ...mapping,
                                            key: e.target.value
                                        })
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <Select value={mapping.source}>

                                    <SelectTrigger>
                                        <SelectValue/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {guestFieldOptions.map(option => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button
                variant="outline"
                onClick={addMapping}>
                + Add Mapping
            </Button>

        </div>

    )
}