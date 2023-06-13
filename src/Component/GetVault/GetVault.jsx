import React, {useContext, useState} from 'react';
import {createStyles, Table, ScrollArea, rem, Button, Textarea,Loader} from '@mantine/core';


const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));



const GetVault = ({ data }) => {

    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);




    const rows = data.map((row,i) => (
        <tr >
            <td>{row.title}</td>
            <td> <Textarea
                value={row.text}

            /></td>
        </tr>
    ));




    return (
        <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table miw={700}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                    <th>Title</th>
                    <th>Text</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
};

export default GetVault;