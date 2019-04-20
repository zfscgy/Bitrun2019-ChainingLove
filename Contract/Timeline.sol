pragma solidity >=0.5.0 <0.7.0;
contract Timeline
{
    enum ActivityType{normal, startLove, breakUp}
    struct Activity
    {
        ActivityType actType;
        uint time;
        address[5] partners;
        string desc;
    }
    struct PersonMoments
    {
        string name;
        address lover;
        address[] friends;
        Activity[] activities;
    }
    mapping(address=>PersonMoments) TimelineTable;
    enum ProposalType {sendLove, activity}
    enum ProposalStatus {waiting, accepted, rejected}
    enum ConfirmationStatus {waiting, accepted, rejected}
    struct Proposal
    {
        ProposalType proposalType;
        ProposalStatus status;
        address proposer;
        ConfirmationStatus[] Confirmations;
        Activity activity;
        uint id;
    }
    Proposal[] AllProposals;
    mapping(address=>uint[]) PersonProposals;
    function Hello() public pure returns(string memory)
    {
        return "hello world!";
    }
    function GetName(address user_addr) public view returns(string memory name)
    {
        return TimelineTable[user_addr].name;
    }
    function SetName(string memory new_name) public returns(string memory status)
    {
        require(bytes(new_name).length < 10, "Name too long");
        require(bytes(new_name).length > 0, "Name cannot be empty");
        address queryAccount = msg.sender;
        status = "ok";
        if(bytes(TimelineTable[queryAccount].name).length != 0)
            status = "new user";
        TimelineTable[queryAccount].name = new_name; 
    }
    function ProposeLove(address lover_addr) public returns(string memory status)
    {
        require(bytes(TimelineTable[lover_addr].name).length != 0, "Lover not registered");
        require(uint(TimelineTable[msg.sender].lover) == 0, "Already have a lover");
        ConfirmationStatus[] memory confirmations = new ConfirmationStatus[](2);
        confirmations[1] = ConfirmationStatus.accepted;
        confirmations[2] = ConfirmationStatus.waiting;
        address[5] memory partners;
        partners[0] = msg.sender;
        partners[1] = lover_addr;
        Proposal memory proposal = Proposal(ProposalType.sendLove, ProposalStatus.waiting, msg.sender, 
            confirmations, Activity(ActivityType.startLove, now, partners, "在一起了"),
            AllProposals.length);
        AllProposals.push(proposal);
        status = "ok";
    }
    function ProposeActivity(address[] memory partners, string  memory desc) public returns(string memory status)
    {
        require(bytes(desc).length < 256, "Description too long");
        require(partners.length <=5, "Cannot add more than 5 partners");
        address[5] memory _partners;
        for(uint j = 0; j < partners.length; j++)
        {
            _partners[j] = partners[j];
        }
        if(partners.length == 1)
        {
            require(partners[0] == msg.sender, "Cannot write other's activity");
            TimelineTable[msg.sender].activities.push(Activity(ActivityType.normal, now, _partners, desc));
            status = "ok";
        }
        else
        {
            Activity memory activity = Activity(ActivityType.normal, now, _partners, desc);
            ConfirmationStatus[] memory confirmations = new ConfirmationStatus[](partners.length);
            Proposal memory proposal = Proposal(ProposalType.activity, ProposalStatus.waiting, msg.sender, confirmations,
                activity, AllProposals.length);
            for(uint i = 0; i < activity.partners.length; i++)
            {
                if(activity.partners[i] == address(0))
                {
                    break;
                }
                if(activity.partners[i] == msg.sender)
                {
                    confirmations[i] = ConfirmationStatus.accepted;
                }
                else
                {
                    confirmations[i] = ConfirmationStatus.waiting;
                }
                PersonProposals[activity.partners[i]].push(proposal.id);
            }
            AllProposals.push(proposal);
        }

    }
    function ConfirmProposal(uint id, uint confirmation) public returns (string memory status)
    {
        require(confirmation==0||confirmation==1, "Invalid confirmation message!");
        Proposal storage proposal = AllProposals[id];
        status = "";
        proposal.status = ProposalStatus.waiting;
        bool allAccepted = true;
        for(uint i = 0; i < proposal.activity.partners.length; i++)
        {
            if(proposal.activity.partners[i] == msg.sender)
            {
                if(proposal.Confirmations[i] != ConfirmationStatus.waiting)
                {
                    status = "already confirmed";
                }
                else
                {
                    if(confirmation == 1)
                    {
                        proposal.Confirmations[i] = ConfirmationStatus.accepted;
                    }
                    else
                    {
                        proposal.Confirmations[i] = ConfirmationStatus.rejected;
                        proposal.status = ProposalStatus.rejected;
                    }
                }
            }
            if(proposal.Confirmations[i]!= ConfirmationStatus.accepted)
            {
                allAccepted = false;
            }
        }
        if(allAccepted)
        {
            proposal.status = ProposalStatus.accepted;
            for(uint j= 0; j < proposal.activity.partners.length; j++)
            {
                TimelineTable[proposal.activity.partners[j]].activities.push(proposal.activity);
            }
        }
        status = "ok";
    }
    function GetProfile(address addr) public view returns(address[6] memory loverAndFriends)
    {
        loverAndFriends[0] = TimelineTable[addr].lover;
        for(uint i = 1; i < 6; i++)
        {
            loverAndFriends[i] = TimelineTable[addr].friends[i - 1];
        }
    }
    /*
        address[6]: 第一个是情侣的， 后5个是5个朋友的
        timelineLen: 时间线的总长度
        proposalsLen: 时间线申请的总长度
     */
    function GetMyStatus() public view returns(address[6] memory, uint, uint)
    {
        address[6] memory addrs;
        addrs[0] = TimelineTable[msg.sender].lover;
        for(uint i = 1; i < TimelineTable[msg.sender].friends.length; i++)
        {
            addrs[i] = TimelineTable[msg.sender].friends[i - 1];
        }
        return (addrs, TimelineTable[msg.sender].activities.length, PersonProposals[msg.sender].length);
    }
    /*
        返回10项时间线数据
    */
    function concate(string memory str1, string memory str2) internal pure returns(string memory)
    {
        return string(abi.encodePacked(str1, str2));
    }
    function GetTimeline(address addr, uint start_index) public view returns (address[5][10] memory addrs, byte[10] memory types, uint[10] memory times,  string memory descs, uint size)
    {
        size = TimelineTable[addr].activities.length - start_index;
        if(size > 10)
        {
            size = 10;
        }
        for(uint i = 0; i < size; i++)
        {
            Activity memory act =  TimelineTable[addr].activities[start_index + i];
            for(uint j = 0; j < 5; j++)
            {
                addrs[i][j] = act.partners[j];
                types[i] = byte(uint8(act.actType));
                times[i] = act.time;
            }
            descs = concate(descs, concate("|sep|", act.desc));
        }
    }
    function GetProposals(address addr, uint start_index) public view returns (byte[10] memory types, address[5][10] memory partners, byte[5][10] memory confirmations, uint[10] memory times, string memory descs, uint size)
    {
        size = PersonProposals[addr].length - start_index;
        if(size > 10)
        {
            size = 10;
        }
        for(uint i = 0; i < size; i++)
        {
            Proposal memory proposal = AllProposals[PersonProposals[addr][start_index + i]];
            types[i] = byte(uint8(proposal.proposalType));
            for(uint j = 0; j < 5; j++)
            {
                partners[i][j] = proposal.activity.partners[j];
                confirmations[i][j] = byte(uint8(proposal.Confirmations[j]));
            }
            times[i] = proposal.activity.time;
            descs = concate(descs, concate("|sep|", proposal.activity.desc));
        }
    }
}