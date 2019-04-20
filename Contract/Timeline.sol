pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;
contract Timeline
{
    enum ActivityType{normal, startLove, breakUp}
    struct Activity
    {
        ActivityType actType;
        uint time;
        address[] partners;
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
    function Hello() public view returns(string memory)
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
        address[] memory partners = new address[](2);
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
        if(partners.length == 1)
        {
            require(partners[0] == msg.sender, "Cannot write other's activity");
            TimelineTable[msg.sender].activities.push(Activity(ActivityType.normal, now, partners, desc));
            status = "ok";
        }
        else
        {
            Activity memory activity = Activity(ActivityType.normal, now, partners, desc);
            ConfirmationStatus[] memory confirmations = new ConfirmationStatus[](partners.length);
            Proposal memory proposal = Proposal(ProposalType.activity, ProposalStatus.waiting, msg.sender, confirmations,
                activity, AllProposals.length);
            for(uint i = 0; i < activity.partners.length; i++)
            {
                if(activity.partners[i] == msg.sender)
                {
                    confirmations[i] = ConfirmationStatus.accepted;
                }
                else
                {
                    confirmations[i] = ConfirmationStatus.waiting;
                    PersonProposals[activity.partners[i]].push(proposal.id);
                }
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
            proposal.activity.partners.push(proposal.proposer);
            for(uint j= 0; j < proposal.activity.partners.length; j++)
            {
                TimelineTable[proposal.activity.partners[j]].activities.push(proposal.activity);
            }
        }
        status = "ok";
    }
    function GetTimeLine(address addr) public view returns (PersonMoments memory moments) 
    {
        return TimelineTable[addr];        
    }
    function GetProposals(address addr) public view returns (Proposal[] memory)
    {
        Proposal[] memory proposals = new Proposal[](PersonProposals[addr].length);
        for(uint i = 0; i < PersonProposals[addr].length; i++)
        {
            proposals[i] = AllProposals[PersonProposals[addr][i]];
        }
    }
}